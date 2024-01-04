import { AddToCart } from "components/commons";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

const ProductListItem = ({ name, slug, offerPrice, imageUrl }) => (
  <Link
    className="flex flex-col items-center rounded border-2 p-4"
    to={buildUrl(routes.products.show, { slug })}
  >
    <img alt={name} className="h-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
    <AddToCart {...{ slug }} />
  </Link>
);

export default ProductListItem;
