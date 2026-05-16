import prisma from '../configs/database.config.js'

async function main() {
  console.log('🌱 Starting seeder...')

  // =========================
  // DELETE ALL DATA
  // =========================
  await prisma.borrowings.deleteMany()
  await prisma.profiles.deleteMany()
  await prisma.users.deleteMany()
  await prisma.book.deleteMany()
  await prisma.categories.deleteMany()

  console.log('🗑️ Old data deleted')

  // =========================
  // CATEGORIES SEED
  // =========================
await prisma.categories.createMany({
  data: [
    { name: 'Fiction' },
    { name: 'Science' },
    { name: 'Technology' },
    { name: 'History' },
    { name: 'Biography' },
    { name: 'Fantasy' },
    { name: 'Horror' },
    { name: 'Romance' },
    { name: 'Education' },
    { name: 'Business' },
    { name: 'Programming' },
    { name: 'Psychology' },
    { name: 'Philosophy' },
    { name: 'Religion' },
    { name: 'Comics' },
  ],
})

const categories = await prisma.categories.findMany()

  console.log('✅ Categories seeded')

  // =========================
  // USERS SEED
  // =========================
  await prisma.users.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'ADMIN',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Michael Johnson',
        email: 'michael@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Daniel Miller',
        email: 'daniel@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Olivia Wilson',
        email: 'olivia@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'James Moore',
        email: 'james@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Sophia Taylor',
        email: 'sophia@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'William Anderson',
        email: 'william@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Isabella Thomas',
        email: 'isabella@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Benjamin Jackson',
        email: 'benjamin@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Mia White',
        email: 'mia@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        name: 'Lucas Harris',
        email: 'lucas@example.com',
        password: 'password123',
        role: 'USER',
      },
    ],
  })

  console.log('✅ Users seeded')

  // =========================
  // PROFILES SEED
  // =========================
  const users = await prisma.users.findMany()

  await prisma.profiles.createMany({
    data: users.map((user, index) => ({
      userId: user.id,
      address: `Street ${index + 1}, Bali`,
      phone: `0812345678${index}`,
    })),
  })

  console.log('✅ Profiles seeded')

  // =========================
  // BOOKS SEED
  // =========================
  await prisma.book.createMany({
    data: [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        available: true,
        categoryId: categories[0].id, // Fiction
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: 1960,
        available: true,
        categoryId: categories[0].id, // Fiction
      },
      {
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        available: true,
        categoryId: categories[0].id, // Fiction
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        year: 2008,
        available: true,
        categoryId: categories[10].id
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        year: 2018,
        available: true,
        categoryId: categories[11].id
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        year: 1937,
        available: true,
        categoryId: categories[5].id,
      },
      {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        year: 1997,
        available: true,
        categoryId: categories[5].id,
      },
      {
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        year: 2020,
        available: true,
        categoryId: categories[9].id,
      },
      {
        title: 'Rich Dad Poor Dad',
        author: 'Robert Kiyosaki',
        year: 1997,
        available: true,
        categoryId: categories[9].id
      },
      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        year: 2011,
        available: true,
        categoryId: categories[4].id,
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        year: 1988,
        available: true,
        categoryId: categories[0].id,
      },
      {
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        year: 1937,
        available: true,
        categoryId: categories[9].id
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        year: 2016,
        available: true,
        categoryId: categories[11].id,
      },
      {
        title: 'Ikigai',
        author: 'Francesc Miralles',
        year: 2016,
        available: true,
        categoryId: categories[11].id,
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        year: 1999,
        available: true,
        categoryId: categories[10].id
      },
      {
        title: 'JavaScript: The Good Parts',
        author: 'Douglas Crockford',
        year: 2008,
        available: true,
        categoryId: categories[10].id
      },
      {
        title: 'Dracula',
        author: 'Bram Stoker',
        year: 1897,
        available: true,
        categoryId: categories[6].id,
      },
      {
        title: 'Frankenstein',
        author: 'Mary Shelley',
        year: 1818,
        available: true,
        categoryId: categories[6].id,
      },
      {
        title: 'The Art of War',
        author: 'Sun Tzu',
        year: -500,
        available: true,
        categoryId: categories[3].id
      },
      {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        year: 2011,
        available: true,
        categoryId: categories[9].id
      },
    ],
  })

  console.log('✅ Books seeded')

  // =========================
  // BORROWINGS SEED
  // =========================
  const books = await prisma.book.findMany()

  await prisma.borrowings.createMany({
    data: [
      {
        userId: users[0].id,
        bookId: books[0].id,
      },
      {
        userId: users[1].id,
        bookId: books[1].id,
      },
      {
        userId: users[2].id,
        bookId: books[2].id,
      },
      {
        userId: users[3].id,
        bookId: books[3].id,
      },
      {
        userId: users[4].id,
        bookId: books[4].id,
      },
      {
        userId: users[5].id,
        bookId: books[5].id,
      },
      {
        userId: users[6].id,
        bookId: books[6].id,
      },
      {
        userId: users[7].id,
        bookId: books[7].id,
      },
      {
        userId: users[8].id,
        bookId: books[8].id,
      },
      {
        userId: users[9].id,
        bookId: books[9].id,
      },
      {
        userId: users[10].id,
        bookId: books[10].id,
      },
      {
        userId: users[11].id,
        bookId: books[11].id,
      },
      {
        userId: users[12].id,
        bookId: books[12].id,
      },
      {
        userId: users[13].id,
        bookId: books[13].id,
      },
      {
        userId: users[14].id,
        bookId: books[14].id,
      },
    ],
  })

  console.log('✅ Borrowings seeded')

  console.log('🎉 Seeder finished')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })