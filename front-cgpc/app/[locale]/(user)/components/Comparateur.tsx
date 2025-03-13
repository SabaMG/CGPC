import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Input,
} from "@nextui-org/react";

const products = [
  {
    key: "1",
    image:
      "https://storage.googleapis.com/a1aa/image/H9u8ijK1gz6wAVZ0TLvOfswYWevCf9z0Gq4CnWYfAVE0fuOfE.jpg",
    title:
      "Gigabyte NVIDIA GeForce RTX 4060 WINDFORCE OC Carte graphique - 8GB GDDR6, 128-bit",
    price: "319,98€",
    delivery: "prime Livraison GRATUITE",
    rating: "4,6",
    reviews: "308",
    vendor: "Amazon",
    coprocessor: "NVIDIA GeForce RTX 4060",
    interface: "pci e x16",
    ramType: "gddr6x",
    ramSize: "8 GB",
    output: "DisplayPort",
    memoryClock: "17000 MHz",
    gpuClock: "2475 MHz",
    resolution: "7680x4320",
    fans: "2",
    manufacturer: "NVIDIA",
  },
  {
    key: "2",
    image:
      "https://storage.googleapis.com/a1aa/image/H9u8ijK1gz6wAVZ0TLvOfswYWevCf9z0Gq4CnWYfAVE0fuOfE.jpg",
    title:
      "Gigabyte NVIDIA GeForce RTX 4060 WINDFORCE OC Carte graphique - 8GB GDDR6, 128-bit",
    price: "319,98€",
    delivery: "prime Livraison GRATUITE",
    rating: "4,6",
    reviews: "308",
    vendor: "Amazon",
    coprocessor: "NVIDIA GeForce RTX 4060",
    interface: "pci e x16",
    ramType: "gddr6x",
    ramSize: "8 GB",
    output: "DisplayPort",
    memoryClock: "17000 MHz",
    gpuClock: "2475 MHz",
    resolution: "7680x4320",
    fans: "2",
    manufacturer: "NVIDIA",
  },
  {
    key: "2",
    image:
      "https://storage.googleapis.com/a1aa/image/H9u8ijK1gz6wAVZ0TLvOfswYWevCf9z0Gq4CnWYfAVE0fuOfE.jpg",
    title:
      "Gigabyte NVIDIA GeForce RTX 4060 WINDFORCE OC Carte graphique - 8GB GDDR6, 128-bit",
    price: "319,98€",
    delivery: "prime Livraison GRATUITE",
    rating: "4,6",
    reviews: "308",
    vendor: "Amazon",
    coprocessor: "NVIDIA GeForce RTX 4060",
    interface: "pci e x16",
    ramType: "gddr6x",
    ramSize: "8 GB",
    output: "DisplayPort",
    memoryClock: "17000 MHz",
    gpuClock: "2475 MHz",
    resolution: "7680x4320",
    fans: "2",
    manufacturer: "NVIDIA",
  },
  // Additional products go here...
];

const columns = [
  { key: "title", label: "Title" },
  { key: "price", label: "Price" },
  { key: "delivery", label: "Delivery" },
  { key: "rating", label: "Rating" },
  { key: "reviews", label: "Reviews" },
  { key: "coprocessor", label: "Proco" },
  { key: "interface", label: "interface" },
  { key: "ramType", label: "Ram Type" },
  { key: "ramSize", label: "Ram Size" },
  { key: "output", label: "Output" },
  { key: "memoryClock", label: "Memory Clock" },
  { key: "gpuClock", label: "GPU Clock" },
  { key: "resolution", label: "Resolution" },
  { key: "fans", label: "Fans" },
];

export default function ProductComparison() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>

      <Table isStriped aria-label="Product comparison table">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(product, columnKey)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mb-4"></div>
      <Input
        aria-label="Add_product"
        classNames={{
            inputWrapper: 'bg-default-100',
            input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder="Add Product..."
        type="Add_product"
    />
    </div>

  );
}
