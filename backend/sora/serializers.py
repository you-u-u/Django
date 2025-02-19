from rest_framework import serializers
from .models import Customer, PurchaseHistory

class PurchaseHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseHistory
        fields = ['id', 'pc_model', 'purchase_date', 'customer']

class CustomerSerializer(serializers.ModelSerializer):
    purchase_history = PurchaseHistorySerializer(many=True, read_only=True)  # リレーションシップをシリアライズ
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'full_name', 'full_name_kana', 'address', 'phone_number', 'email', 'purchase_history']
