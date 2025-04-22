export const asynchandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "fail", err });
    });
  };
};
