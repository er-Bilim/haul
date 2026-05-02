import { Establishment } from '../../model/establishment/Establishment.ts';
import { Image } from '../../model/gallery/Image.ts';
import User from '../../model/user/User.ts';
import type { IImage } from '../../types/gallery/image.types.ts';

const ImageService = {
  create: async (data: IImage) => {
    const image = new Image(data);

    await User.findByIdAndUpdate(image.toObject().user, {
      $push: { images: image },
    });

    await Establishment.findByIdAndUpdate(image.toObject().establishment, {
      $push: { images: image },
    });

    return await image.save();
  },
  delete: async (id: string) => {
    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) return null;

    await Establishment.findByIdAndUpdate(deletedImage.establishment, {
      $pull: { images: deletedImage._id },
    });

    await User.findByIdAndUpdate(deletedImage.user, {
      $pull: { images: deletedImage._id },
    });

    return deletedImage;
  },
};

export default ImageService;
