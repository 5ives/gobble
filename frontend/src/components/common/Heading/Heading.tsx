import { ReactNode } from "react";
import { Title } from "@mantine/core";
import { HeadingWrapper } from "./HeadingStyles";

const Heading = ({ children } : { children : ReactNode }): JSX.Element => {
    return (
        <HeadingWrapper><Title>{children}</Title></HeadingWrapper>
    );
};

export default Heading;
