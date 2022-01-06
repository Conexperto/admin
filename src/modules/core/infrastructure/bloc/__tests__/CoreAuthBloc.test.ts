import { FirebaseAuthClientFactory } from "src/modules/shared/infrastructure/persistence/firebase/FirebaseAuthClientFactory";
import { FirebaseClientFactory } from "src/modules/shared/infrastructure/persistence/firebase/FirebaseClientFactory";
import { LocalStorageFactory } from "src/modules/shared/infrastructure/persistence/local-storage/LocalStorageFactory";
import { FirebaseCoreAuthRepository } from "../../persistence/FirebaseCoreAuthRepository";
import * as config from "src/modules/shared/infrastructure/config/adminsdk.json";
import { CoreAuthBloc } from "src/modules/core/application/bloc/CoreAuthBloc";
import { CoreAppBloc } from "src/modules/core/application/bloc/CoreAppBloc";

jest.mock(
  "src/modules/shared/infrastructure/persistence/firebase/FirebaseAuthClientFactory"
);
jest.mock(
  "src/modules/shared/infrastructure/persistence/firebase/FirebaseClientFactory"
);
jest.mock("../../persistence/FirebaseCoreAuthRepository");
jest.mock(
  "src/modules/shared/infrastructure/persistence/local-storage/LocalStorageFactory"
);

describe("CoreAuthBloc", () => {
  let bloc: CoreAuthBloc;

  FirebaseAuthClientFactory.createClient = jest.fn().mockReturnValue({});
  FirebaseClientFactory.createClient = jest.fn().mockReturnValue({});

  it("should be instance CoreAuthBloc", () => {
    bloc = new CoreAuthBloc(
      new FirebaseCoreAuthRepository(
        FirebaseAuthClientFactory.createClient(
          "admin",
          FirebaseClientFactory.createClient("admin", config)
        )
      ),
      new LocalStorageFactory(),
      new CoreAppBloc()
    );

    expect(bloc).toBeInstanceOf(CoreAuthBloc);
  });
});
