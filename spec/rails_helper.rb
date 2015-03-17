if ENV['HEADLESS']
  require 'headless'
  headless = Headless.new
  headless.start
  at_exit { headless.stop }
end

ENV["RAILS_ENV"] ||= 'test'
require 'spec_helper'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.infer_spec_type_from_file_location!

  config.before(:each) do
    page.driver.block_unknown_urls
  end
end