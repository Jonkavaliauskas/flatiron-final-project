class CreateProfileInterests < ActiveRecord::Migration[6.0]
  def change
    create_table :profile_interests do |t|
      t.integer :profile_id
      t.integer :interest_id

      t.timestamps
    end
  end
end
