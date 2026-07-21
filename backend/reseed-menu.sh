#!/bin/bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTcwMjQ2OWJkM2RjMWQxN2YwODQ2YyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDYwMDk4MywiZXhwIjoxNzg1MjA1NzgzfQ.R4VtdbwlZRhrUeN4GoroZiGGw4lVRo9edBPrifLChSk"
URL="http://localhost:5000/api/menu"

echo "Fetching existing items to delete..."
IDS=$(curl -s $URL | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)

for id in $IDS; do
  curl -s -X DELETE "$URL/$id" -H "Authorization: Bearer $TOKEN" > /dev/null
  echo "Deleted $id"
done

echo "Seeding new menu..."

create_item() {
  curl -s -X POST $URL -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" -d "$1"
  echo ""
}

# RICE (orange)
create_item '{"name":"Jollof Rice","description":"Smoky party-style jollof rice","price":2500,"category":"Rice","imageUrl":"https://placehold.co/400x300/f97316/ffffff?text=Jollof+Rice"}'
create_item '{"name":"Fried Rice","description":"Nigerian-style fried rice with vegetables","price":2500,"category":"Rice","imageUrl":"https://placehold.co/400x300/f97316/ffffff?text=Fried+Rice"}'
create_item '{"name":"Coconut Rice","description":"Fragrant rice cooked in coconut milk","price":2700,"category":"Rice","imageUrl":"https://placehold.co/400x300/f97316/ffffff?text=Coconut+Rice"}'
create_item '{"name":"White Rice & Stew","description":"Steamed white rice with rich tomato stew","price":2200,"category":"Rice","imageUrl":"https://placehold.co/400x300/f97316/ffffff?text=White+Rice"}'
create_item '{"name":"Ofada Rice","description":"Local rice served with ofada sauce","price":3000,"category":"Rice","imageUrl":"https://placehold.co/400x300/f97316/ffffff?text=Ofada+Rice"}'

# SOUPS (red)
create_item '{"name":"Egusi Soup","description":"Melon seed soup with assorted meat","price":3000,"category":"Soups","imageUrl":"https://placehold.co/400x300/dc2626/ffffff?text=Egusi+Soup"}'
create_item '{"name":"Efo Riro","description":"Rich vegetable soup with assorted meat and fish","price":3000,"category":"Soups","imageUrl":"https://placehold.co/400x300/dc2626/ffffff?text=Efo+Riro"}'
create_item '{"name":"Ogbono Soup","description":"Draw soup made from ground ogbono seeds","price":3000,"category":"Soups","imageUrl":"https://placehold.co/400x300/dc2626/ffffff?text=Ogbono+Soup"}'
create_item '{"name":"Okra Soup","description":"Light okra soup with assorted meat and fish","price":2800,"category":"Soups","imageUrl":"https://placehold.co/400x300/dc2626/ffffff?text=Okra+Soup"}'
create_item '{"name":"Pepper Soup","description":"Spicy light soup, perfect for any weather","price":2500,"category":"Soups","imageUrl":"https://placehold.co/400x300/dc2626/ffffff?text=Pepper+Soup"}'

# PROTEINS (brown)
create_item '{"name":"Grilled Chicken","description":"Well-seasoned grilled chicken","price":3500,"category":"Proteins","imageUrl":"https://placehold.co/400x300/92400e/ffffff?text=Grilled+Chicken"}'
create_item '{"name":"Beef Suya","description":"Spicy grilled beef skewers","price":2000,"category":"Proteins","imageUrl":"https://placehold.co/400x300/92400e/ffffff?text=Beef+Suya"}'
create_item '{"name":"Grilled Fish","description":"Whole grilled fish with pepper sauce","price":4000,"category":"Proteins","imageUrl":"https://placehold.co/400x300/92400e/ffffff?text=Grilled+Fish"}'
create_item '{"name":"Turkey","description":"Fried and seasoned turkey pieces","price":3800,"category":"Proteins","imageUrl":"https://placehold.co/400x300/92400e/ffffff?text=Turkey"}'
create_item '{"name":"Goat Meat","description":"Tender goat meat in rich pepper sauce","price":3200,"category":"Proteins","imageUrl":"https://placehold.co/400x300/92400e/ffffff?text=Goat+Meat"}'

# DRINKS (blue)
create_item '{"name":"Chapman","description":"Refreshing Nigerian cocktail mocktail","price":1500,"category":"Drinks","imageUrl":"https://placehold.co/400x300/2563eb/ffffff?text=Chapman"}'
create_item '{"name":"Zobo","description":"Chilled hibiscus drink","price":1000,"category":"Drinks","imageUrl":"https://placehold.co/400x300/2563eb/ffffff?text=Zobo"}'
create_item '{"name":"Soft Drink","description":"Chilled soft drink of your choice","price":700,"category":"Drinks","imageUrl":"https://placehold.co/400x300/2563eb/ffffff?text=Soft+Drink"}'
create_item '{"name":"Bottled Water","description":"Chilled bottled water","price":300,"category":"Drinks","imageUrl":"https://placehold.co/400x300/2563eb/ffffff?text=Water"}'
create_item '{"name":"Smoothie","description":"Fresh fruit smoothie blend","price":2000,"category":"Drinks","imageUrl":"https://placehold.co/400x300/2563eb/ffffff?text=Smoothie"}'

# DESSERTS (pink)
create_item '{"name":"Puff Puff","description":"Sweet fried dough balls","price":800,"category":"Desserts","imageUrl":"https://placehold.co/400x300/db2777/ffffff?text=Puff+Puff"}'
create_item '{"name":"Chin Chin","description":"Crunchy sweet fried snack","price":1000,"category":"Desserts","imageUrl":"https://placehold.co/400x300/db2777/ffffff?text=Chin+Chin"}'
create_item '{"name":"Meat Pie","description":"Flaky pastry filled with seasoned meat","price":900,"category":"Desserts","imageUrl":"https://placehold.co/400x300/db2777/ffffff?text=Meat+Pie"}'
create_item '{"name":"Cake Slice","description":"Soft vanilla cake slice","price":1200,"category":"Desserts","imageUrl":"https://placehold.co/400x300/db2777/ffffff?text=Cake"}'
create_item '{"name":"Ice Cream","description":"Chilled vanilla ice cream scoop","price":1500,"category":"Desserts","imageUrl":"https://placehold.co/400x300/db2777/ffffff?text=Ice+Cream"}'

echo "Done seeding 25 items."
