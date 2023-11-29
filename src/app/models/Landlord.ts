import { Nominess } from './Nominees';

export class Landlord {
  public Id: string | undefined;
  public Name: string | undefined;
  public Email: string | undefined;
  public CreateBy: string | undefined;
  public CreateDate: string | undefined;
  public UpdateBy: string | undefined;
  public UpdateDate: string | undefined;

  public RecordCount: string | undefined;
  public RecordFilter: string | undefined;
  public ActionType: string | undefined;
  public Nominees: Nominess[] = [];
}
