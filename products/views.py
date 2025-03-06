from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Product

# Create your views here.
def get_users(request):
    users = User.objects.all().values('id', 'username', 'email')
    return JsonResponse(list(users), safe=False)

def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        return JsonResponse({'id': user.id, 'username': user.username, 'email': user.email})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
def get_products(request):
    products = Product.objects.all().values()
    return JsonResponse(list(products), safe=False)

def get_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return JsonResponse({
        'id': product.id,
        'user': product.user.username,
        'name': product.name,
        'image': product.image.url,
        'brand': product.brand,
        'category': product.category,
        'description': product.description,
        'rating': product.rating,
        'numReviews': product.numReviews,
        'price': product.price,
        'stock': product.stock,
        'createdAt': product.createdAt,
        'updatedAt': product.updatedAt,
        'uuid': product.uuid
    })
