Hanami::Model.migration do
  change do
    create_table :items do
      primary_key :id

      column :character, String, null: false, unique: true

      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
    end
  end
end
