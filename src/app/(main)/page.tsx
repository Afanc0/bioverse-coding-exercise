import { BioverseLogo } from "@bioverse-intake/components/bioverse-logo";

import LoginPanel from "@bioverse-intake/components/login-panel";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <header>
        <div className="py-10 px-8 flex justify-start low-res-viewport-div">
          <BioverseLogo width="250"/>
        </div>
      </header>
      <main>
        <section>
          <div className="flex justify-center items-center py-16 flex-col gap-4">
            <LoginPanel />
            <div>
              <span className="text-gray-600 low-res-viewpoint-p">
                <span className="text-[#286ba2] font-bold">Hint: </span>
                Click "Forget Password?" to receive login information
              </span>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
