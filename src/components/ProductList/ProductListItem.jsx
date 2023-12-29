import { Typography } from "neetoui";
import { Link } from "react-router-dom";

const ProductListItem = ({ name, slug, offerPrice, imageUrl }) => (
  <Link
    className="flex flex-col items-center rounded border-2 p-4"
    to={`/products/${slug}`}
  >
    <img alt={name} className="h-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
  </Link>
);

export default ProductListItem;
