import Button from "../../components/Button";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <div>
      <Button
        type="primary"
        title="Sign Out"
        onPress={() => signOut({ callbackUrl: "/" })}
      />
    </div>
  );
}
