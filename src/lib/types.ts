
export type ProductCategory =
  | 'Saplings'
  | 'Aquarium'
  | 'Terrarium'
  | 'Sculptures'
  | 'Furniture'
  | 'Fishes'
  | 'Paintings'
  | 'Pots'
  | 'Tools'
  | 'Soil';

export interface Plant {
  id: string;
  name: string;
  species: string;
  size: 'Small' | 'Medium' | 'Large';
  condition: 'Excellent' | 'Good' | 'Fair';
  price: number;
  sellerId?: string; // Optional as it might not be on all denormalized documents
  seller: { 
    name: string;
    avatar: string;
  };
  images: string[];
  description: string;
  stock: number;
  category?: ProductCategory;
}
