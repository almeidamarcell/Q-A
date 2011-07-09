class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :open_identifier
      t.string :password
      t.integer :reputation, :default => 0
      t.boolean :is_banned, :default => false
      t.datetime :last_seen_on

      t.timestamps
    end

    add_index :users, :name
    add_index :users, :email

  end
end
