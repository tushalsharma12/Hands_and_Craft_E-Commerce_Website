import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true }, // Image Path
  rating: { type: Number, required: true },
  price: { type: String, required: true },
  prev_price: { type: String, required: true },
  discount: { type: String, required: true },
  page: { type: String, enum: ["Home", "Dining", "Lighting","Decor", "Garden","ProductDetails","Showmore"], required: true },
  section: { type: String, enum: ["Gifts","today_big_deals","New Arrivals","Most Loved","Indian Art Forms","explore","Special Price","Popular","SliderImages","Slider2Images","DiningRounded1","DiningRounded2","Drinkware1","Drinkware2","Tableware1","Tableware2","Serveware1","Serveware2","Cutlery","LightingRounded1","LightingRounded2","Festivallight1","Festivallight2","Lamps1","Lamps2","DiyaSet1","DiyaSet2","Candles1","Candles2","DecorRounded1","DecorRounded2","Wall_Decor1","Wall_Decor2","Vases1","Vases2","OfficeDesk1","OfficeDesk2","BathDecor1","BathDecor2","GardenRounded1","GardenRounded2","Pots_Planters1","Pots_Planters2","Decorative_Hangings1","Decorative_Hangings2","Garden_Decor_Product1","Garden_Decor_Product2","More_Garden_Product","testimonials"], required: true },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.methods.getNumericPrice = function() {
  return Number(this.price.replace(/[^0-9.-]+/g,""));
};


const Product = mongoose.model('Product', productSchema);
export default Product;

