from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, PurchaseHistoryViewSet

router = DefaultRouter()

# ViewSetの登録
router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'purchase-history', PurchaseHistoryViewSet, basename='purchasehistory')

urlpatterns = [
    path('', include(router.urls)),  # ルーターのURLパターンを含める
]
