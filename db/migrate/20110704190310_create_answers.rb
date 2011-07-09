class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :question_id
      t.integer :user_id
      t.string :text
      t.boolean :is_accepted
      t.integer :accepted_by

      t.timestamps
    end
  end
end
