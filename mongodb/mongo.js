const {MongoClient} = require('mongodb')

async function main() {
    const uri = 'mongodb+srv://viktoriia:ZatingKAFs9PHJTs@mongo.75hhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    const client = new MongoClient(uri)
    try {
        await client.connect()
        // await createListing(client, {
        //     name: "Lovely Loft",
        //     summary: "A charming loft in Paris",
        //     bedrooms: 1,
        //     bathrooms: 1,
        //
        // })

        // await createMultipleListing(client, [
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Rome",
        //         bedrooms: 4,
        //         bathrooms: 3,
        //
        //     },
        //     {
        //         name: "Lovely Loft",
        //         summary: "A charming loft in Kyiv",
        //         bedrooms: 5,
        //         bathrooms: 6,
        //
        //     },
        // ])

        // await findOneListingByName(client, 'Venue Hotel Old City')

        // await findListingWithMinBedroomsBathroomsAndMostRecentViews(client, {
        //     minNumOfBedrooms: 10,
        //     minNumOfBathrooms: 3,
        //     maxNumOfResults: 10
        // })

        // await updateListingByName(client, 'Venue Hotel Old City', {bedrooms: 6, beds: 8})

        // await upsertListingByName(client, 'Cozy Cottage', {
        //     name: 'Cozy Cottage',
        //     bedrooms: 7,
        //     bathrooms: 1,
        // })

        // await updateAppListingsToHavePropertyType(client)

        await deleteListingsScrapedBeforeDate(client, new Date("2019-02-15"))

        // await deleteListingByName(client, 'Venue Hotel Old City')
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

main().catch(console.error)

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing)
    console.log(`New listing was created with the following id: ${result.insertedId}`);
}

async function createMultipleListing(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings)
    console.log(`${result.insertedCount} new listings created with the following id(s): `)
    console.log(result.insertedIds)
}

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({
        name: nameOfListing
    })

    if (result) {
        console.log(`Find a listing with name ${nameOfListing}`)
        console.log(result)
    } else {
        console.log(`No listings found with the name ${nameOfListing}`)
    }
}

async function findListingWithMinBedroomsBathroomsAndMostRecentViews(client, {
    minNumOfBedrooms = 0,
    minNumOfBathrooms = 0,
    maxNumOfResults = Number.MAX_SAFE_INTEGER,
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        //gte - grater than or equal to
        bedrooms: {$gte: minNumOfBedrooms},
        bathrooms: {$gte: minNumOfBathrooms},
    })
        .sort({last_review: -1})
        .limit(maxNumOfResults)

    const results = await cursor.toArray()
    if (results.length > 0) {
        results.forEach(res => {
            console.log(res.name + " " + res._id)
        })
    } else {
        console.log('No results with such params')
    }
}

async function updateListingByName(client, nameOfListing, updatedListing) {
    const results = await client.db('sample_airbnb').collection('listingsAndReviews').updateOne({
        name: nameOfListing
    }, {$set: updatedListing})
    console.log(`${results.matchedCount} document(s) matched the query criteria`)
    console.log(`${results.modifiedCount} document(s) was/were updated`);
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    const results = await client.db('sample_airbnb').collection('listingsAndReviews').updateOne({
        name: nameOfListing
    }, {$set: updatedListing}, {upsert: true})
    console.log(`${results.matchedCount} document(s) matched the query criteria`)
    if (results.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${results.upsertedId}`)
    } else {
        console.log(`${results.modifiedCount} document(s) were updated`)
    }
}

async function updateAppListingsToHavePropertyType(client) {
    const result = await client.db('sample_airbnb').collection('listingsAndReviews').updateMany({
        property_type: {$exists: false}
    }, {$set: {property_type: 'Unknown'}})
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} document(s) was/were updated`);
}

async function deleteListingByName(client, nameOfListing) {
    const result = await client.db('sample_airbnb').collection('listingsAndReviews').deleteOne({
        name: nameOfListing
    })
    console.log(`${result.deletedCount} was/were deleted`)
}

async function deleteListingsScrapedBeforeDate(client, date) {
    const result = await client.db('sample_airbnb').collection('listingsAndReviews').deleteMany({
        'last_scraped': {$lt: date}
    })
    console.log(`${result.deletedCount} was/were deleted`)
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => console.log(db.name))
    console.log()
}