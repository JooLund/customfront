
exports.saveSettings = (req, res) => {
    let settings = req.body;
    res.cookie('settings', JSON.stringify(settings), {maxAge: 5000000000});
    res.status(200).send('Settings saved!');

    console.log('Saved settings as cookies');
}
