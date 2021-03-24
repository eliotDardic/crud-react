const Card = ({ data }) => {
  return (
    <div>
      <h3>{data.name}</h3>
      <img
        style={{ height: "200px", width: "200px" }}
        src={data.avatar}
        alt=""
      />
    </div>
  );
};

export default Card;
