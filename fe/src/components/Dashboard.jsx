import useAuth from "./UseAuth";

export default function Dashboard(code) {
  let accesToken = useAuth(code.code);
  console.log(code.code);
  return (
    <div>
      Cod din link:
      {code.code}, <br /> Cod de acces: {accesToken}
    </div>
  );
}
