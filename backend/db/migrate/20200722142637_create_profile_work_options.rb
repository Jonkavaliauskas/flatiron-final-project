class CreateProfileWorkOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :profile_work_options do |t|
      t.integer :profile_id
      t.integer :work_option_id

      t.timestamps
    end
  end
end
