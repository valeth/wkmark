Hanami::Model.migration do
  change do
    alter_table :items do
      add_column :reading, String
      add_column :meaning, String
    end
  end
end
