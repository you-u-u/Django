from rest_framework import viewsets
from django.http import JsonResponse
from .models import Customer, PurchaseHistory
from .serializers import CustomerSerializer, PurchaseHistorySerializer

# Customer ViewSet
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()  # クエリセットを定義
    serializer_class = CustomerSerializer  # シリアライザを指定

# PurchaseHistory ViewSet (必要に応じて追加)
class PurchaseHistoryViewSet(viewsets.ModelViewSet):
    queryset = PurchaseHistory.objects.all()
    serializer_class = PurchaseHistorySerializer

# 既存のJSONエンドポイント
def customer_list(request):
    customers = Customer.objects.all()
    data = [
        {
            'id': customer.id,
            'full_name': customer.full_name,
            'full_name_kana': customer.full_name_kana,
            'purchase_history': [
                {
                    'pc_model': history.pc_model,
                    'purchase_date': history.purchase_date
                } for history in customer.purchase_history.all()
            ]
        } for customer in customers
    ]
    return JsonResponse(data, safe=False)
