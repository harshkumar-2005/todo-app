const logout = (req, res) => {
    // console.log("logout successfully.");

    // Clear the token cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: false, // Match login settings for development
        sameSite: 'strict',
        path: '/'
    });

    res.status(200).json({
        success: true,
        message: 'You are logged out!!!!!!'
    });
}

export default logout;