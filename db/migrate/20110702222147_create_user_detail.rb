class CreateUserDetail < ActiveRecord::Migration
  def change
    create_table :user_detail do |t|
      t.integer :user_id
      t.string :web_site
      t.string :location
      t.string :information
      t.boolean :is_male
      t.integer :year_of_birth

      t.timestamps
    end
  end
end
