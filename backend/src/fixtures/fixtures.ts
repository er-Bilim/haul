import mongoose from 'mongoose';
import config from '../config.ts';
import User from '../model/user/User.ts';
import { Establishment } from '../model/establishment/Establishment.ts';
import { Review } from '../model/review/Review.ts';
import { Image } from '../model/gallery/Image.ts';

const fixtureImagesPath: string = `../fixtures/images`;

const run = async () => {
  await mongoose.connect(config.db);

  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('establishments');
    await db.dropCollection('reviews');
    await db.dropCollection('images');
  } catch (error) {
    console.error(error);
  }

  const [admin, bobr] = await User.create([
    {
      email: 'admin@gmail.com',
      displayName: 'admin',
      avatar: `${fixtureImagesPath}/beaver.png`,
      password: 'admin123',
      role: 'admin',
    },
    {
      email: 'bobr@gmail.com',
      displayName: 'bobr',
      avatar: `${fixtureImagesPath}/gorilla.png`,
      password: 'bobr123',
    },
  ]);

  admin!.generateRefreshToken();
  await admin!.save();
  bobr!.generateRefreshToken();
  await bobr!.save();

  const [sunken, sword, winchester] = await Establishment.create([
    {
      name: 'Sunken Flagon',
      description:
        'A cozy tavern in the heart of the city. Famous for its craft beer selection and hearty meals.',
      mainPhoto: 'uploads/establishment/sunken.png',
      owner: admin!._id,
    },
    {
      name: 'The Broken Sword',
      description:
        'A medieval-themed restaurant with live music every weekend and an extensive wine list.',
      mainPhoto: 'uploads/establishment/broken_sword.png',
      owner: bobr!._id,
    },
    {
      name: 'The Winchester',
      description:
        'A classic British pub. Have a pint, wait for this all to blow over.',
      mainPhoto: 'uploads/establishment/winchester.png',
      owner: bobr!._id,
    },
  ]);

  await User.findByIdAndUpdate(admin!._id, {
    $push: { establishments: sunken!._id },
  });
  await User.findByIdAndUpdate(bobr!._id, {
    $push: { establishments: { $each: [sword!._id, winchester!._id] } },
  });

  const reviews = await Review.create([
    {
      text: 'Amazing place, best beer in town!',
      qualityOfFood: 5,
      serviceQuality: 4,
      interior: 5,
      author: bobr!._id,
      establishment: sunken!._id,
    },
    {
      text: 'Good food but service was a bit slow.',
      qualityOfFood: 4,
      serviceQuality: 3,
      interior: 4,
      author: admin!._id,
      establishment: sunken!._id,
    },
    {
      text: 'Lovely atmosphere, will definitely come back.',
      qualityOfFood: 4,
      serviceQuality: 5,
      interior: 3,
      author: bobr!._id,
      establishment: sword!._id,
    },
    {
      text: 'Nothing special, but decent food.',
      qualityOfFood: 3,
      serviceQuality: 3,
      interior: 3,
      author: admin!._id,
      establishment: winchester!._id,
    },
  ]);

  await Establishment.findByIdAndUpdate(sunken!._id, {
    $push: { reviews: { $each: [reviews[0]!._id, reviews[1]!._id] } },
  });
  await Establishment.findByIdAndUpdate(sword!._id, {
    $push: { reviews: reviews[2]!._id },
  });
  await Establishment.findByIdAndUpdate(winchester!._id, {
    $push: { reviews: reviews[3]!._id },
  });

  await User.findByIdAndUpdate(bobr!._id, {
    $push: { reviews: { $each: [reviews[0]!._id, reviews[2]!._id] } },
  });
  await User.findByIdAndUpdate(admin!._id, {
    $push: { reviews: { $each: [reviews[1]!._id, reviews[3]!._id] } },
  });

  const images = await Image.create([
    {
      url: 'uploads/establishment/sunken.png',
      user: admin!._id,
      establishment: sunken!._id,
    },
    {
      url: 'uploads/establishment/broken_sword.png',
      user: bobr!._id,
      establishment: sword!._id,
    },
  ]);

  await Establishment.findByIdAndUpdate(sunken!._id, {
    $push: {
      images: [images[0]!._id, images[1]!._id, images[1]!._id, images[1]!._id],
    },
  });
  await Establishment.findByIdAndUpdate(sword!._id, {
    $push: { images: [images[1]!._id, images[0]!._id, images[0]!._id] },
  });
  await User.findByIdAndUpdate(admin!._id, {
    $push: { images: images[0]!._id },
  });
  await User.findByIdAndUpdate(bobr!._id, {
    $push: { images: images[1]!._id },
  });

  await mongoose.disconnect();
};

run().catch((error) => console.error(error));
