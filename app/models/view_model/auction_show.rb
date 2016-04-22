module ViewModel
  class AuctionShow < Struct.new(:current_user, :auction_record)
    include ActionView::Helpers::NumberHelper

    def auction
      @auction ||= ViewModel::Auction.new(current_user, auction_record)
    end

    delegate :title, :summary, :html_description, :status, :id,
             :bid_count, :issue_url,
             :user_bid_amount_as_currency, :show_bid_button?,
             to: :auction, prefix: true

    delegate :highlighted_bid_amount_as_currency,
             :highlighted_bid_amount, :highlighted_bid, :auction_type,
             :auction_rules_href,
             to: :auction

    def auction_status_header
      if auction_won?
        "Winning bid (#{auction.highlighted_bidder_name}):"
      else
        auction.highlighted_bid_label
      end
    end

    def auction_status_partial
      # This is a bit ugly since the partial has an if-else in it now
      auction.partial_path('auction_status')
    end

    def current_user_header_partial
      current_user_has_no_sam_verification? ? "/components/no_sam_verification_header" : win_header_partial
    end

    def win_header_partial
      auction.partial_path('win_header')
    end

    def auction_link_text
      "#{auction.bid_count} #{bid_to_plural}"
    end

    def auction_deadline_label
      auction.over? ? "Auction ended at:" : "Bid deadline:"
    end

    def auction_formatted_end_time
      return "" unless auction.end_datetime
      auction.end_datetime.strftime("%m/%d/%Y at %I:%M %p %Z")
    end

    def auction_start_label
      auction.over? ? "Auction started at:" : "Bid start time:"
    end

    def auction_formatted_start_time
      return "" unless auction.start_datetime
      auction.start_datetime.strftime("%m/%d/%Y at %I:%M %p %Z")
    end

    def auction_rules_link
      "<a href='#{auction_rules_href}'>Rules for #{auction.formatted_type} auctions</a>".html_safe
    end

    def auction_won?
      auction.over? && auction.bids?
    end

    private

    def bid_to_plural
      auction.bids? ? "bids" : "bid"
    end

    def current_user_has_no_sam_verification?
      current_user && !current_user.sam_accepted?
    end
  end
end
