require "active_support/time"

desc "Cleans the DB of abandoned games."
namespace "db" do
  namespace "clean" do    
    task :games => :environment do
      puts "Starting cleaning process..."
      
      records = Game.
      where.not(status: ["host_win", "joining_win", "tie"]).
      where("created_at < ?", 12.hours.ago)
      
      records.each do |record|
        puts "Deleting game with ID: #{record.id}"
        record.destroy
      end
      puts "Old games cleaned from Database."
      
    end
  end
end