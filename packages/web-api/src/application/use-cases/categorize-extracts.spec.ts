import { 
    CategorizeExtractsUseCaseFactory,
    SignUpUseCaseFactory
} from '@application/use-cases';
import { 
    UserRepository,
    ExtractRepository,
    CategoryRepository,
} from '@adapters/repositories';
import { 
    TypeORMDatabase, 
    // InMemoryDatabase 
  } from '@frameworks/databases';
import { BCryptEncryptionService, JWTTokenService, OpenBankingService } from '@frameworks/services';

const testDataBuilder = async (database) => {

    const extractsRepository = new ExtractRepository({ db: database});
    const categoriesRepository = new CategoryRepository({ db: database});
    const userRepository = new UserRepository({ db: database });

    const getTestExtract = (args: {
        id?: string,
        amount?: number,
        categoryId?: string,
        userId?: string
    }) => ({
        id: args.id || '1',
        amount: args.amount || 100,
        categoryId: args.categoryId || null,
        description: '',
        timeStamp: 1,
        type: 'credit',
        userId: args.userId || '1',
    });

    const getTestCategory = (args: {
        id?: string,
        name?: string,
        total?: number
    }) => ({
        id: args.id || '1',
        name: args.name || 'lazer',
        total: args.total || 0,
    })

    const categorizeExtractUseCase = CategorizeExtractsUseCaseFactory({
        extractsRepository,
        categoriesRepository
    });

    return {
        categorizeExtractUseCase,
        extractsRepository,
        categoriesRepository,
        userRepository,
        getTestExtract,
        getTestCategory,
    }
}

describe.skip("Categorizing an extract which is", () => {

    const database = new TypeORMDatabase({ 
        dbConnectionName: 'test',
    });
    let user;

    beforeAll(async () => {
        await database.connect();
    });
    afterAll(async () => {
        await database.closeConnection();
    });

    beforeEach(async () => {
        const testData = await testDataBuilder(database)

        const encryptionService = new BCryptEncryptionService();
        const signupUseCase = SignUpUseCaseFactory({
            userRepository: testData.userRepository,
            encryptionService
        });

        await signupUseCase.execute({
            email: 'validEmail@email.com',
            password: '1234asdfgr',
            cpf: '12345432',
            name: 'name'
        });

        user = await testData.userRepository.getUserByEmail('validEmail@email.com');
    });

    afterEach(async () => {
        await database.getCollection('extracts').deleteAll();
        await database.getCollection('categories').deleteAll();
        await database.getCollection('users').deleteAll();
    });

    test("Uncategorized into an empty category", async () => {
        const { 
            categorizeExtractUseCase,
            extractsRepository, 
            categoriesRepository,
            getTestCategory,
            getTestExtract 
        } = await testDataBuilder(database);

        // get test data
        const testExtract = getTestExtract({});
        const testCategory = getTestCategory({});

        // setup extract
        await extractsRepository.addExtracts([testExtract]);

        // categorize it: SUT
        await categorizeExtractUseCase.execute({
            userId: user.id,
            extractId: testExtract.id,
            category: testCategory.name
        });

        // fetch category adn extract from db to see if they were correctly modified
        const categoryDTO = (await categoriesRepository.getAllFromUser(user.id)).find(category => category.name === testCategory.name);
        const extractDTO = await extractsRepository.getByCategoryId(categoryDTO!.id!);

        // expectations
        expect(extractDTO[0].categoryId).toStrictEqual(categoryDTO!.id)
        expect(categoryDTO!.total).toEqual(extractDTO[0].amount);
    })
    test.todo("Uncategorized into a category with other extracts")
    test.todo("Uncategorized into a category with this extract plus others")

    test.todo("Categorized into the same category, category has only this one")
    test.todo("Categorized into the same category, category has this extract plus others")
    test.todo("Categorized into a different category")


});