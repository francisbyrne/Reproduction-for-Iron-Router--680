## Overview
This reproduces the Iron Router issue where the template property is not set to "not_found" when there is no data.

## Reproduction

1. Clone this repo
2. Navigate to repo folder
3. `mrt install`
4. `meteor`
5. Open http://localhost:3000 in browser
6. Open the javascript console and check the "current template" is "item_list"
7. Go to a random non-existent page e.g. http://localhost:3000/asdasdasd
8. Check `current template` is now `not_found`
9. Go to a non existent item page e.g. http://localhost:3000/item/asdadadad
10. `current template` is now `item_page`

## Expected
`current template` should be `not_found` for non-existent data when `dataNotFound` hook is active and the not_found template has been loaded.

## Actual 
`current template` is `item_page`.