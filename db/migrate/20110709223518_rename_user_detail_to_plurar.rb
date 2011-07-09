class RenameUserDetailToPlurar < ActiveRecord::Migration
  def change
    rename_table :user_detail, :user_details
  end
end
