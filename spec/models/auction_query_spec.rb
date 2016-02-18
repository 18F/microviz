require 'rails_helper'

RSpec.describe AuctionQuery do
  let(:query) { AuctionQuery.new }

  describe '#accepted' do
    let(:accepted_auction) { FactoryGirl.create(:auction, :accepted) }
    let!(:rejected_auction) { FactoryGirl.create(:auction, result: :rejected) }

    it 'should return only accepted auctions' do
      expect(query.accepted).to match_array([accepted_auction])
    end
  end

  describe '#not_evaluated' do
    let(:unevaluated_auction) { FactoryGirl.create(:auction, :running) }
    let!(:evaluated_auction) { FactoryGirl.create(:auction, :accepted) }
    let!(:rejected_auction) { FactoryGirl.create(:auction, result: :rejected) }

    it 'should only return non-evaluated auctions' do
      expect(query.not_evaluated).to match_array([unevaluated_auction])
    end
  end

  describe '#delivery_deadline_expired' do
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }
    let(:dd_expired_auction) do
      FactoryGirl.create(:auction, :delivery_deadline_expired)
    end

    it 'should return only delivery deadline expired auctions' do
      expect(query.delivery_deadline_expired).to match_array([dd_expired_auction])
    end
  end

  describe '#delivered' do
    let(:delivered_auction) { FactoryGirl.create(:auction, :delivered) }
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }

    it 'should return only delivered auctions' do
      expect(query.delivered).to match_array([delivered_auction])
    end
  end

  describe '#cap_submitted' do
    let(:cap_submitted) { FactoryGirl.create(:auction, :cap_submitted) }
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }

    it 'should return only cap_submitted auctions' do
      expect(query.cap_submitted).to match_array([cap_submitted])
    end
  end

  describe '#cap_not_submitted' do
    let!(:cap_submitted) { FactoryGirl.create(:auction, :cap_submitted) }
    let(:running_auction) { FactoryGirl.create(:auction, :running) }

    it 'should return only auctions where CAP has not been submitted' do
      expect(query.cap_not_submitted).to match_array([running_auction])
    end
  end

  describe '#paid' do
    let(:paid_auction) { FactoryGirl.create(:auction, :paid) }
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }

    it 'should only return paid auctions' do
      expect(query.paid).to match_array([paid_auction])
    end
  end

  describe '#not_paid' do
    let!(:paid_auction) { FactoryGirl.create(:auction, :paid) }
    let(:running_auction) { FactoryGirl.create(:auction, :running) }

    it 'should only return unpaid auctions' do
      expect(query.not_paid).to match_array([running_auction])
    end
  end

  describe '#in_reverse_chron_order' do
    let(:auctions) { 5.times.map { FactoryGirl.create(:auction) } }
    let(:sorted_auctions) do
      auctions.sort_by {|a| a.end_datetime}
    end

    it 'should return auctions in reverse chronological order by endtime' do
      expect(query.in_reverse_chron_order).to match_array(sorted_auctions)
    end
  end

  describe '#published' do
    let(:published) { FactoryGirl.create(:auction, :published) }
    let!(:unpublished) { FactoryGirl.create(:auction, :unpublished) }

    it 'should only return published auctions' do
      expect(query.published).to match_array([published])
    end
  end

  describe '#unpublished' do
    let!(:published) { FactoryGirl.create(:auction, :published) }
    let(:unpublished) { FactoryGirl.create(:auction, :unpublished) }

    it 'should only return unpublished auctions' do
      expect(query.unpublished).to match_array([unpublished])
    end
  end

  describe '#complete_and_successful' do
    let(:complete_and_successful) do
      FactoryGirl.create(:auction, :complete_and_successful)
    end
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }
    let!(:rejected_auction) { FactoryGirl.create(:auction, result: :rejected) }
    let!(:unpaid_auction) do
      FactoryGirl.create(:auction, awardee_paid_status: :not_paid)
    end
    let(:anomolous_auction) { FactoryGirl.create(:auction, :rejected, :paid) }

    it 'should only return complete and successful auctions' do
      expect(query.complete_and_successful)
        .to match_array([complete_and_successful])
    end
  end

  describe '#payment_pending' do
    let(:payment_pending) { FactoryGirl.create(:auction, :payment_pending) }
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }
    let!(:paid_auction) { FactoryGirl.create(:auction, :paid) }
    let!(:complete_and_successful) do
      FactoryGirl.create(:auction, :complete_and_successful)
    end

    it 'should only return finished auctions where payment is pending' do
      expect(query.payment_pending).to match_array([payment_pending])
    end
  end

  describe '#payment_needed' do
    let(:payment_needed) { FactoryGirl.create(:auction, :payment_needed) }
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }
    let!(:payment_pending) { FactoryGirl.create(:auction, :payment_pending) }
    let!(:complete_and_successful) do
      FactoryGirl.create(:auction, :complete_and_successful)
    end

    it 'should only return auctions where payment is needed' do
      expect(query.payment_needed).to match_array([payment_needed])
    end
  end

  describe '#evaluation_needed' do
    let(:evaluation_needed) { FactoryGirl.create(:auction, :evaluation_needed) }
    let!(:complete_and_successful) do
      FactoryGirl.create(:auction, :complete_and_successful)
    end
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }
    let!(:payment_pending) { FactoryGirl.create(:auction, :payment_pending) }
    let!(:payment_needed) { FactoryGirl.create(:auction, :payment_needed) }

    it 'should only return auctions where an evaluation is needed' do
      expect(query.evaluation_needed).to match_array([evaluation_needed])
    end
  end

  describe '#delivery_past_due' do
    let(:delivery_past_due) { FactoryGirl.create(:auction, :delivery_past_due) }
    let!(:complete_and_successful) do
      FactoryGirl.create(:auction, :complete_and_successful)
    end
    let!(:running_auction) { FactoryGirl.create(:auction, :running) }
    let!(:payment_pending) { FactoryGirl.create(:auction, :payment_pending) }
    let!(:payment_needed) { FactoryGirl.create(:auction, :payment_needed) }
    let!(:rejected) { FactoryGirl.create(:auction, :rejected) }

    it 'should only return auctions where delivery is past due' do
      expect(query.delivery_past_due).to match_array([delivery_past_due])
    end
  end

  describe '#public_find' do
    let(:unpublished_auction) { FactoryGirl.create(:auction, :unpublished) }
    let(:published_auction) { FactoryGirl.create(:auction, :published) }

    it 'should not return an unpublished auction' do
      expect { query.public_find(unpublished_auction.id) }
        .to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'should return a published auction' do
      expect(query.public_find(published_auction.id)).to eq(published_auction)
    end
  end

  describe '#public_index' do
    let!(:unpublished_auction) { FactoryGirl.create(:auction, :unpublished) }
    let(:published_auction) { FactoryGirl.create(:auction, :published) }

    it 'should only return published auctions' do
      expect(query.public_index).to match_array([published_auction])
    end
  end

end