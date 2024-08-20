import { useContext, ReactNode } from "react";
import { AuthContext } from "../auth-provider";

interface WithAuthOnlyProps {
    children: ReactNode;
    alternative?: ReactNode;
}

export default function WithAuthOnly({ children, alternative }: WithAuthOnlyProps){
    const { isSignedIn } = useContext(AuthContext) ?? {};

    if (!isSignedIn) {
        return alternative ?? null;
    }

    return children;
}