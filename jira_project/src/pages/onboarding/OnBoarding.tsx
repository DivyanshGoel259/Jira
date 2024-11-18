import { CreateOrganizations } from "./components/CreateOrganizations";

export const OnBoarding = () => {
  return (
    <div className="flex justify-center flex-col mt-20">
      <div className="flex justify-center ">
        <div>
          <CreateOrganizations />
        </div>
      </div>
    </div>
  );
};
