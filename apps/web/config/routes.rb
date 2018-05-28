# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#

root to: 'items#index'
post '/items', to: 'items#create'
delete '/items/:id', to: 'items#destroy', as: :item
