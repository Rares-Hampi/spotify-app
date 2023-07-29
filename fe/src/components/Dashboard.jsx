import useAuth from "./useAuth";

export default function Dashboard(code) {
  const accesToken = useAuth(code.code);
  return (
    <div>
      {code.code}
      <h1>Auth code : {accesToken}</h1>
    </div>
  );
}
