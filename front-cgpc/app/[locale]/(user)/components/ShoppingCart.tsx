"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useTranslations } from 'next-intl';

// Types for cart items
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ShoppingCartDropdown() {
  const t = useTranslations('shopping');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Produit 1",
      price: 25.99,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Produit 2",
      price: 15.49,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = (): string => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button auto color="primary" shadow>
          {t('cart')} ({cartItems.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[400px] overflow-auto">
        {cartItems.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t('empty')}
          </div>
        ) : (
          <div className="p-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-4">
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h2 className="text-sm font-bold">{item.name}</h2>
                      <p className="text-xs text-gray-600">Prix: ${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <label className="text-xs font-medium">Qté:</label>
                        <Input
                          value={item.quantity}
                          type="number"
                          min={1}
                          className="w-16 text-xs"
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                        />
                        <Button
                          color="danger"
                          size="xs"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          {t('del')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            <div className="text-right mt-4">
              <h3 className="text-sm font-bold">Total: ${calculateTotal()}</h3>
              <Button color="success" size="sm" className="mt-2">
              {t('val')}
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
