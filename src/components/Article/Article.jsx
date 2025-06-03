
import Image from 'next/image';
import img1 from '../../assets/articleimg.png';
import img2 from '../../assets/articleimg2.png';
import img3 from '../../assets/articleimg3.png';
import img4 from '../../assets/articleimg4.png';
import img5 from '../../assets/articleimg5.png';
import img6 from '../../assets/articleimg6.png';
import img7 from '../../assets/articleimg7.png';
import img8 from '../../assets/articleimg8.png';
const articles = [
  {
    id: 1,
    image: img2,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Tracey Allen',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 2,
    image: img3,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Jason Francisco',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 3,
    image: img4,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Elizabeth Slavin',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },{
    id: 4,
    image: img5,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Eric Smith',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },{
    id: 5,
    image: img1,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Elizabeth Slavin',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },{
    id: 6,
    image: img6,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Tracey Allen',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },{
    id: 7,
    image: img7,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    author: 'Ernie Smith',
    date: 'August 26, 2023',
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  // Add 8 more article objects with different images, authors, etc.
];

const ArticleSection = () => {
  return (
    <>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-28 bg-gray-50">
  <h2 className="text-3xl  font-extrabold text-[#8bb09b] mb-6 text-left">Articles</h2>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {articles.map((article) => (
      <div
        key={article.id}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 group"
      >
        <div className="overflow-hidden rounded-lg cursor-pointer">
          <Image
            src={article.image}
            alt="Article"
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-blue-600 text-sm font-semibold mt-4">Tecnology</h3>
        <p className="text-gray-800 font-semibold text-base mt-1 line-clamp-2">
          {article.title}
        </p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div className="flex items-center ">
            <img src={article.avatar} alt="author" className="w-9 h-9  rounded-full mr-2" />
            <span>{article.author}</span>
          </div>
          <span>{article.date}</span>
        </div>
      </div>
    ))}
  </div>

  <div className="text-center mt-12">
    <button className="bg-[#8bb09b] text-white px-6 py-3 rounded-lg shadow hover:bg-[#75b590] transition duration-300">
      Load More
    </button>
  </div>
</div>
</>
  );
};

export default ArticleSection;
