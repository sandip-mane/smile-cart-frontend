import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";
import { useHistory } from "react-router-dom";

const Header = ({ title, shouldShowBackButton }) => {
  const history = useHistory();

  return (
    <>
      <div className="flex items-center">
        {shouldShowBackButton && (
          <LeftArrow
            className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-6"
            onClick={history.goBack}
          />
        )}
        <Typography className="ml-2 py-2" style="h1" weight="semibold">
          {title}
        </Typography>
      </div>
      <hr className="border-2 border-black" />
    </>
  );
};

export default Header;
