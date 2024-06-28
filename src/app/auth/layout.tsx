const AuthLayout = ({
    children
}: {
    children : React.ReactNode
}) => {
    return (
        <div className="h-dvh flex  items-center justify-center bg-gray-900">
            {children}

        </div>
    )
}

export default AuthLayout;