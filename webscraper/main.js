
const main = () => {
    console.log('Hello, world!');

    // successfully query restaurants page depending on passed in category

    // get names and locations of restaurants from getFeedV1 request
    // - data.feedItems.[n].store.mapMarker.latitude
    // - data.feedItems.[n].store.mapMarker.longitude
    // - data.feedItems.[n].store.title.text

    // for each extracted restaurant title, click on it and get all menu items
    // - there are different menus. for each menu, (a tags with href starting with /store)

    // each menu has the following structure
    // - outer parent is an <li> with class name gz h0 h1 hy ag h3 h4 h5 h6
    // - name of food is <div> with class name bl bm cy df ax
    // - price of food is <div> with class name hp ah ep ht
    // - description of food is <div> with class name hp hq i2 hr bs i3 ct

    /**
     * final restaurant structure should be:
     * { title: string, lat: number, long: number, menu: array<object> (menu) }
     */

    /**
     * final menu structure should be:
     * [ { name: string, price: number, description: string } ]
     */
};

main();
