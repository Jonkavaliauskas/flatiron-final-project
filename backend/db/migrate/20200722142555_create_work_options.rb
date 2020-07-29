class CreateWorkOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :work_options do |t|
      t.string :name

      t.timestamps
    end
  end
end
