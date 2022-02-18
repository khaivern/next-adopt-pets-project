import React from "react";
import Card from "../../ui/Card/card";
import Checkbox from "../../ui/Checkbox/checkbox";

import classes from "./pet-header.module.css";

const formatAddress = (address) => {
  const { address1, address2, city, state, postcode, country } = address;
  const wholeAddress = `${address1},${address2},${city},${state},${postcode},${country}`;
  const validAddress = wholeAddress.split(",").filter((val) => val !== "null");
  const formattedAddress = validAddress.join(", ");
  return { formattedAddress, validAddress };
};

const PetHeader = ({ pet }) => {
  if (!pet) {
    return null;
  }
  const { formattedAddress: address, validAddress } = formatAddress(
    pet.contact.address
  );

  return (
    <Card className={classes.card}>
      <header className={classes.header}>
        <div className={classes["header--main__content"]}>
          <h1>{pet.name}</h1>
          <hr />
          <div className={classes["header--main__content-image"]}>
            <img
              src={pet.photos[0].full}
              alt='Image'
              width={600}
              height={300}
            />
          </div>
        </div>
        <div className={classes["header--secondary__content"]}>
          <div className={classes["header--secondary__content--contact"]}>
            <Card className={classes["contact--card"]}>
              <h2>CONTACT US</h2>
              <h3>
                <a href={`mailto: ${pet.contact.email}`}>
                  📩 Email: {pet.contact.email}
                </a>
              </h3>
              <h3>
                📞 Phone:{" "}
                <strong>
                  {pet.contact.phone || "No phone number provided"}
                </strong>
              </h3>
              <h3>
                🏠 Address:{" "}
                <strong>
                  {validAddress ? address : "No address provided.."}
                </strong>
              </h3>
            </Card>
          </div>
          <div className={classes["header--secondary__content--attributes"]}>
            <Card className={classes["attributes--card"]}>
              <h2>Attributes</h2>
              <ul className={classes["attributes--list"]}>
                <Checkbox
                  label='House Trained'
                  checked={pet.attributes.house_trained || false}
                />
                <Checkbox
                  label='Is Declawed'
                  checked={pet.attributes.declawed || false}
                />
                <Checkbox
                  label='Special Needs'
                  checked={pet.attributes.special_needs || false}
                />
              </ul>
            </Card>
          </div>
          <div className={classes["header--secondary__content--attributes"]}>
            <Card className={classes["attributes--card"]}>
              <h2>Environment (Good With)</h2>
              <ul className={classes["attributes--list"]}>
                <Checkbox
                  label='Children'
                  checked={pet.environment.children || false}
                />
                <Checkbox
                  label='Dogs'
                  checked={pet.environment.dogs || false}
                />
                <Checkbox
                  label='Cats'
                  checked={pet.environment.cats || false}
                />
              </ul>
            </Card>
          </div>
        </div>
      </header>
    </Card>
  );
};

export default PetHeader;
