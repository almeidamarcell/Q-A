class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :user_id
      t.string :title
      t.string :description
      t.integer :view_count
      t.integer :duplicate_id, :null => true
      t.integer :mark_as_duplicated_by, :null => true
      t.integer :status

      t.timestamps
    end

    add_index :questions, :user_id
  end
end
