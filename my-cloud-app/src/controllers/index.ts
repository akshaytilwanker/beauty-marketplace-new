class IndexController {
    public async getHome(req, res) {
        res.send('Welcome to the Home Page');
    }

    public async getAbout(req, res) {
        res.send('About Us');
    }

    public async getContact(req, res) {
        res.send('Contact Us');
    }
}

export default IndexController;