import Link from "next/link";
import React from "react";
import css from "@/components/Navigation/style.module.css";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <div className="container">
        <div className={css.nav__wrapper}>
          <Link className={css.link} href={"/product"}>
            Мої Товари
          </Link>
          <Link className={css.link} href={"/"}>
            Мої Візити
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
