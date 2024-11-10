
import { UserButton } from "@clerk/clerk-react"
import { ChartIcon } from "../assets/Icons"

export const UserMenu = () => {
    return <div className="flex justify-center flex-col">
        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
            <UserButton.MenuItems>
                <UserButton.Link href="/onboarding" label="My Organizations" labelIcon={<ChartIcon />} />
                <UserButton.Action label="manageAccount" />
            </UserButton.MenuItems>
        </UserButton>
    </div>
}