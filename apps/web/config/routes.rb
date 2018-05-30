# Configure your routes here
# See: http://hanamirb.org/guides/routing/overview/
#

root to: 'items#index'

resources :items, only: %i[index create destroy update]
